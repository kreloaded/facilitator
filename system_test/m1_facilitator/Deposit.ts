// Copyright 2020 OpenST Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Account } from 'web3-eth-accounts';
import Mosaic from 'Mosaic';
import Web3 from 'web3';

import AddressHandler from '../common/AddressHandler';
import Faucet from '../common/Faucet';
import Utils from '../common/Utils';
import Logger from '../../src/common/Logger';

interface Balance {
  [key: string]: number;
}

export default class Deposit {
  public static async depositSystemTest(): Promise<void> {
    const config = await Utils.getConfig();
    const {
      depositorCount,
      concurrencyCount,
      iterations,
      pollingInterval,
      timeoutInterval,
    } = config.testData.deposit;
    const originWsEndpoint = config.chains.origin.wsEndpoint;
    const auxiliaryWsEndpoint = config.chains.auxiliary.wsEndpoint;
    const originChainId = config.chains.origin.chainId;

    const originWeb3 = new Web3(originWsEndpoint);
    originWeb3.transactionConfirmationBlocks = 1;
    const auxiliaryWeb3 = new Web3(auxiliaryWsEndpoint);

    const messageHashes: string[] = [];

    const initialOriginAccountBalance: Balance = {};
    const expectedOriginAccountBalance: Balance = {};
    const initialAuxiliaryAccountBalance: Balance = {};
    const finalAuxiliaryAccountBalance: Balance = {};

    let testDepositorAccounts = [];
    let totalDepositorAccounts: any[] = [];

    for (let i = 0; i < iterations; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testDepositorAccounts = await AddressHandler.getRandomAddresses(
        depositorCount,
        concurrencyCount,
      );
      // eslint-disable-next-line no-await-in-loop
      await Utils.addAccountsToWeb3Wallet(testDepositorAccounts, originWeb3);

      // eslint-disable-next-line no-await-in-loop
      await Faucet.fundAccounts(testDepositorAccounts, originChainId, originWeb3);

      const initialBalancePromises = testDepositorAccounts.map(
        async (account: Account): Promise<void> => {
          const { valueToken } = config.chains.origin;
          // const { utilityToken } = config.chains.auxiliary;

          const originBalance = await AddressHandler.getTokenBalance(
            account.address,
            originWeb3,
            valueToken,
          );
          initialOriginAccountBalance[account.address] = originBalance;

          // TO DO: (node:7600) UnhandledPromiseRejectionWarning:
          // Error: This contract object doesn't have address set yet, please set an address first.
          const auxiliaryBalance = await AddressHandler.getTokenBalance(
            account.address,
            auxiliaryWeb3,
            utilityToken,
          );

          console.log('aux balance :- ', auxiliaryBalance);

        },
      );

      // eslint-disable-next-line no-await-in-loop
      await Promise.all(initialBalancePromises);

      const depositTransactionPromises = testDepositorAccounts.map(
        async (account: Account): Promise<void> => {
          originWeb3.transactionConfirmationBlocks = 1;
          const { txObject, depositAmount } = await this.createDepositTransactionObject(
            account,
            originWeb3,
          );
          if (expectedOriginAccountBalance[account.address]) {
            expectedOriginAccountBalance[account.address] += depositAmount;
          } else {
            expectedOriginAccountBalance[account.address] = depositAmount;
          }

          const txReceipt = await Utils.sendTransaction(txObject, {
            from: account.address,
          });
          console.log('Deposit txReceipt :-', txReceipt);

          const {
            messageHash,
          } = txReceipt.events.DepositIntentDeclared.returnValues;

          messageHashes.push(messageHash);
        },
      );

      // TO DO: timeout interval logic suggested by sarvesh.

      // eslint-disable-next-line no-await-in-loop
      await Promise.all(depositTransactionPromises);
      // eslint-disable-next-line no-await-in-loop
      await new Promise(done => setTimeout(done, pollingInterval));
      totalDepositorAccounts = totalDepositorAccounts.concat(testDepositorAccounts);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    await new Promise(done => setTimeout(done, timeoutInterval));

    const finalAuxiliaryBalancePromises = testDepositorAccounts.map(
      async (account: Account): Promise<void> => {
        const { utilityToken } = config.chains.auxiliary;

        const auxiliaryBalance = await AddressHandler.getTokenBalance(
          account.address,
          auxiliaryWsEndpoint,
          utilityToken,
        );
        finalAuxiliaryAccountBalance[account.address] = auxiliaryBalance;
      },
    );
    // eslint-disable-next-line no-await-in-loop
    await Promise.all(finalAuxiliaryBalancePromises);

    const totalUniqueDepositorAccounts = totalDepositorAccounts.filter(
      async (item, index, ar): Promise<boolean> => ar.indexOf(item) === index,
    );

    Deposit.generateReport(
      initialOriginAccountBalance,
      expectedOriginAccountBalance,
      initialAuxiliaryAccountBalance,
      finalAuxiliaryAccountBalance,
      testDepositorAccounts,
      messageHashes,
    );

    await Faucet.refundOSTToFaucet(totalUniqueDepositorAccounts);
  }

  private static async createDepositTransactionObject(account: Account, web3: any): Promise<any> {
    const config = await Utils.getConfig();

    const erc20GatewayAddress = config.chains.origin.gateway;
    const erc20Gateway = Mosaic.interacts.getERC20Gateway(web3, erc20GatewayAddress);

    const { minAmount } = config.testData.deposit;
    const { maxAmount } = config.testData.deposit;
    const testAmount = await Utils.getRandomNumber(minAmount, maxAmount);

    const { minGasPrice } = config.testData.deposit;
    const { maxGasPrice } = config.testData.deposit;
    const testGasPrice = await Utils.getRandomNumber(minGasPrice, maxGasPrice);

    const { minGasLimit } = config.testData.deposit;
    const { maxGasLimit } = config.testData.deposit;
    const testGasLimit = await Utils.getRandomNumber(minGasLimit, maxGasLimit);

    const { valueToken } = config.chains.origin;
    const valueTokenInstance = Mosaic.interacts.getERC20I(web3, valueToken);

    // TO DO: approve
    const approveRawTx = valueTokenInstance.methods.approve(
      erc20GatewayAddress,
      testAmount,
    );

    const txReceipt = await Utils.sendTransaction(approveRawTx, {
      from: account.address,
    });
    console.log('Approve txReceipt :-', txReceipt);

    return {
      txObject: erc20Gateway.methods.deposit(
        testAmount,
        account.address,
        testGasPrice,
        testGasLimit,
        valueToken,
      ),
      depositAmount: testAmount,
    };
  }

  private static async generateReport(
    initialOriginAccountBalance: Balance,
    expectedOriginAccountBalance: Balance,
    initialAuxiliaryAccountBalance: Balance,
    finalAuxiliaryAccountBalance: Balance,
    testDepositorAccounts: Account[],
    messageHashes: string[],
  ): Promise<void> {
    const config = await Utils.getConfig();
    const { valueToken } = config.chains.origin;
    const originWsEndpoint = config.chains.origin.wsEndpoint;
    Logger.info('\t\t Origin \t\t');
    Logger.info('Address \t Balance Before Deposit \t Balance After Deposit \t Expected Balance Change \t Actual Balance Change \t Success(T/F)');
    testDepositorAccounts.map(
      async (account: Account): Promise<void> => {
        const balanceBeforeDeposit = initialOriginAccountBalance[account.address];
        const balanceAfterDeposit = await AddressHandler.getTokenBalance(
          account.address,
          originWsEndpoint,
          valueToken,
        );

        const expectedBalanceChange = expectedOriginAccountBalance[account.address];
        const actualBalanceChange = balanceAfterDeposit - balanceBeforeDeposit;
        const success = (expectedBalanceChange === actualBalanceChange);

        Logger.info(`${account.address} \t ${balanceBeforeDeposit} \t ${balanceAfterDeposit} \t ${expectedBalanceChange} \t ${actualBalanceChange} \t ${success}`);
      },
    );
    Logger.info('\t\t Metachain \t\t');
    Logger.info('Address \t Balance Before Confirm Deposit \t Balance After Confirm Deposit \t Expected Balance Change \t Actual Balance Change \t Success(T/F)');

    const { utilityToken } = config.chains.auxiliary;
    const auxiliaryWsEndpoint = config.chains.auxiliary.wsEndpoint;
    testDepositorAccounts.map(
      async (account: Account): Promise<void> => {
        const balanceBeforeConfirmDeposit = initialAuxiliaryAccountBalance[account.address];
        const balanceAfterConfirmDeposit = await AddressHandler.getTokenBalance(
          account.address,
          auxiliaryWsEndpoint,
          utilityToken,
        );

        const expectedBalanceChange = finalAuxiliaryAccountBalance[account.address]
          - initialAuxiliaryAccountBalance[account.address];
        const actualBalanceChange = balanceAfterConfirmDeposit - balanceBeforeConfirmDeposit;
        const success = (expectedBalanceChange === actualBalanceChange);
        Logger.info(`${account.address} \t ${balanceBeforeConfirmDeposit} \t ${balanceAfterConfirmDeposit} \t ${expectedBalanceChange} \t ${actualBalanceChange} \t ${success}`);
      },
    );

    const erc20GatewayAddress = config.chains.origin.gateway;
    const originWeb3 = new Web3(originWsEndpoint);
    const erc20Gateway = Mosaic.interacts.getERC20Gateway(originWeb3, erc20GatewayAddress);

    Logger.info('MessageHash \t Success');
    messageHashes.map(
      async (messageHash: string): Promise<void> => {
        // To check that messageHash exists in the outbox mapping.
        const messageStatus = await erc20Gateway.methods.outbox(messageHash).call();
        Logger.info(`${messageHash} \t ${messageStatus}`);
      },
    );
  }
}

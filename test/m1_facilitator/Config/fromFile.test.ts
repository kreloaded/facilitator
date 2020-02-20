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

import fs from 'fs-extra';
import yaml from 'js-yaml';
import Config, { DBConfig } from '../../../src/m1_facilitator/Config/Config';
import assert from '../../test_utils/assert';

describe('Config.fromFile()', (): void => {
  it('should return correct facilitator config object', async (): Promise<void> => {
    const manifestFilePath = 'testdata/m1_facilitator/facilitator_manifest.yml';
    const inputYamlConfig = yaml.safeLoad(fs.readFileSync(manifestFilePath, 'utf8'));
    const config = Config.fromFile(manifestFilePath);

    assert.strictEqual(
      config.version,
      inputYamlConfig.version,
      `Expected value is ${inputYamlConfig.version} but found ${config.version}`,
    );

    assert.strictEqual(
      config.architectureLayout,
      inputYamlConfig.architecture_layout,
      `Expected value is ${inputYamlConfig.architecture_layout} but found ${config.architectureLayout}`,
    );

    assert.deepStrictEqual(
      config.personas,
      inputYamlConfig.personas,
      `Expected value is ${inputYamlConfig.personas} but found ${config.personas}`,
    );

    assert.strictEqual(
      config.chain,
      inputYamlConfig.chain,
      `Expected value is ${inputYamlConfig.chain} but found ${config.chain}`,
    );

    const dbConfig = new DBConfig();
    assert.deepStrictEqual(
      config.dbConfig,
      dbConfig,
      'Mismatch in dbConfig object.',
    );

    assert.deepStrictEqual(
      config.encryptedAccounts,
      inputYamlConfig.accounts,
      `Expected value is ${inputYamlConfig.accounts} but found ${config.encryptedAccounts}`,
    );

    assert.deepStrictEqual(
      config.originContractAddresses,
      inputYamlConfig.origin_contract_addresses,
      `Expected value is ${inputYamlConfig.originContractAddresses} but found ${config.originContractAddresses}`,
    );

    assert.deepStrictEqual(
      config.tokens,
      inputYamlConfig.facilitate_tokens,
      `Expected value is ${inputYamlConfig.facilitate_tokens} but found ${config.tokens}`,
    );
  });
});

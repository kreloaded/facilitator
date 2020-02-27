// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class DepositIntentConfirmed extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id !== null,
      "Cannot save DepositIntentConfirmed entity without an ID"
    );
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save DepositIntentConfirmed entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("DepositIntentConfirmed", id.toString(), this);
  }

  static load(id: string): DepositIntentConfirmed | null {
    return store.get(
      "DepositIntentConfirmed",
      id
    ) as DepositIntentConfirmed | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get messageHash(): Bytes {
    let value = this.get("messageHash");
    return value.toBytes();
  }

  set messageHash(value: Bytes) {
    this.set("messageHash", Value.fromBytes(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockHash(): Bytes {
    let value = this.get("blockHash");
    return value.toBytes();
  }

  set blockHash(value: Bytes) {
    this.set("blockHash", Value.fromBytes(value));
  }

  get contractAddress(): Bytes {
    let value = this.get("contractAddress");
    return value.toBytes();
  }

  set contractAddress(value: Bytes) {
    this.set("contractAddress", Value.fromBytes(value));
  }

  get uts(): BigInt {
    let value = this.get("uts");
    return value.toBigInt();
  }

  set uts(value: BigInt) {
    this.set("uts", Value.fromBigInt(value));
  }
}

export class GatewayProven extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save GatewayProven entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save GatewayProven entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("GatewayProven", id.toString(), this);
  }

  static load(id: string): GatewayProven | null {
    return store.get("GatewayProven", id) as GatewayProven | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get remoteGateway(): Bytes {
    let value = this.get("remoteGateway");
    return value.toBytes();
  }

  set remoteGateway(value: Bytes) {
    this.set("remoteGateway", Value.fromBytes(value));
  }

  get gatewayProveBlockNumber(): BigInt {
    let value = this.get("gatewayProveBlockNumber");
    return value.toBigInt();
  }

  set gatewayProveBlockNumber(value: BigInt) {
    this.set("gatewayProveBlockNumber", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockHash(): Bytes {
    let value = this.get("blockHash");
    return value.toBytes();
  }

  set blockHash(value: Bytes) {
    this.set("blockHash", Value.fromBytes(value));
  }

  get contractAddress(): Bytes {
    let value = this.get("contractAddress");
    return value.toBytes();
  }

  set contractAddress(value: Bytes) {
    this.set("contractAddress", Value.fromBytes(value));
  }

  get uts(): BigInt {
    let value = this.get("uts");
    return value.toBigInt();
  }

  set uts(value: BigInt) {
    this.set("uts", Value.fromBigInt(value));
  }
}

export class ProxyCreation extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save ProxyCreation entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save ProxyCreation entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("ProxyCreation", id.toString(), this);
  }

  static load(id: string): ProxyCreation | null {
    return store.get("ProxyCreation", id) as ProxyCreation | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get proxy(): Bytes {
    let value = this.get("proxy");
    return value.toBytes();
  }

  set proxy(value: Bytes) {
    this.set("proxy", Value.fromBytes(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockHash(): Bytes {
    let value = this.get("blockHash");
    return value.toBytes();
  }

  set blockHash(value: Bytes) {
    this.set("blockHash", Value.fromBytes(value));
  }

  get contractAddress(): Bytes {
    let value = this.get("contractAddress");
    return value.toBytes();
  }

  set contractAddress(value: Bytes) {
    this.set("contractAddress", Value.fromBytes(value));
  }

  get uts(): BigInt {
    let value = this.get("uts");
    return value.toBigInt();
  }

  set uts(value: BigInt) {
    this.set("uts", Value.fromBigInt(value));
  }
}

export class UtilityTokenCreated extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save UtilityTokenCreated entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save UtilityTokenCreated entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("UtilityTokenCreated", id.toString(), this);
  }

  static load(id: string): UtilityTokenCreated | null {
    return store.get("UtilityTokenCreated", id) as UtilityTokenCreated | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get valueToken(): Bytes {
    let value = this.get("valueToken");
    return value.toBytes();
  }

  set valueToken(value: Bytes) {
    this.set("valueToken", Value.fromBytes(value));
  }

  get utilityToken(): Bytes {
    let value = this.get("utilityToken");
    return value.toBytes();
  }

  set utilityToken(value: Bytes) {
    this.set("utilityToken", Value.fromBytes(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockHash(): Bytes {
    let value = this.get("blockHash");
    return value.toBytes();
  }

  set blockHash(value: Bytes) {
    this.set("blockHash", Value.fromBytes(value));
  }

  get contractAddress(): Bytes {
    let value = this.get("contractAddress");
    return value.toBytes();
  }

  set contractAddress(value: Bytes) {
    this.set("contractAddress", Value.fromBytes(value));
  }

  get uts(): BigInt {
    let value = this.get("uts");
    return value.toBigInt();
  }

  set uts(value: BigInt) {
    this.set("uts", Value.fromBigInt(value));
  }
}

export class WithdrawIntentDeclared extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id !== null,
      "Cannot save WithdrawIntentDeclared entity without an ID"
    );
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save WithdrawIntentDeclared entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("WithdrawIntentDeclared", id.toString(), this);
  }

  static load(id: string): WithdrawIntentDeclared | null {
    return store.get(
      "WithdrawIntentDeclared",
      id
    ) as WithdrawIntentDeclared | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get nonce(): BigInt {
    let value = this.get("nonce");
    return value.toBigInt();
  }

  set nonce(value: BigInt) {
    this.set("nonce", Value.fromBigInt(value));
  }

  get beneficiary(): Bytes {
    let value = this.get("beneficiary");
    return value.toBytes();
  }

  set beneficiary(value: Bytes) {
    this.set("beneficiary", Value.fromBytes(value));
  }

  get feeGasPrice(): BigInt {
    let value = this.get("feeGasPrice");
    return value.toBigInt();
  }

  set feeGasPrice(value: BigInt) {
    this.set("feeGasPrice", Value.fromBigInt(value));
  }

  get feeGasLimit(): BigInt {
    let value = this.get("feeGasLimit");
    return value.toBigInt();
  }

  set feeGasLimit(value: BigInt) {
    this.set("feeGasLimit", Value.fromBigInt(value));
  }

  get withdrawer(): Bytes {
    let value = this.get("withdrawer");
    return value.toBytes();
  }

  set withdrawer(value: Bytes) {
    this.set("withdrawer", Value.fromBytes(value));
  }

  get utilityToken(): Bytes {
    let value = this.get("utilityToken");
    return value.toBytes();
  }

  set utilityToken(value: Bytes) {
    this.set("utilityToken", Value.fromBytes(value));
  }

  get messageHash(): Bytes {
    let value = this.get("messageHash");
    return value.toBytes();
  }

  set messageHash(value: Bytes) {
    this.set("messageHash", Value.fromBytes(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockHash(): Bytes {
    let value = this.get("blockHash");
    return value.toBytes();
  }

  set blockHash(value: Bytes) {
    this.set("blockHash", Value.fromBytes(value));
  }

  get contractAddress(): Bytes {
    let value = this.get("contractAddress");
    return value.toBytes();
  }

  set contractAddress(value: Bytes) {
    this.set("contractAddress", Value.fromBytes(value));
  }

  get uts(): BigInt {
    let value = this.get("uts");
    return value.toBigInt();
  }

  set uts(value: BigInt) {
    this.set("uts", Value.fromBigInt(value));
  }
}

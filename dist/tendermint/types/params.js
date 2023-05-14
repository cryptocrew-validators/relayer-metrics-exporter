/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../../google/protobuf/duration";
export const protobufPackage = "tendermint.types";
function createBaseConsensusParams() {
    return { block: undefined, evidence: undefined, validator: undefined, version: undefined };
}
export const ConsensusParams = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.block !== undefined) {
            BlockParams.encode(message.block, writer.uint32(10).fork()).ldelim();
        }
        if (message.evidence !== undefined) {
            EvidenceParams.encode(message.evidence, writer.uint32(18).fork()).ldelim();
        }
        if (message.validator !== undefined) {
            ValidatorParams.encode(message.validator, writer.uint32(26).fork()).ldelim();
        }
        if (message.version !== undefined) {
            VersionParams.encode(message.version, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseConsensusParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.block = BlockParams.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.evidence = EvidenceParams.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.validator = ValidatorParams.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.version = VersionParams.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            block: isSet(object.block) ? BlockParams.fromJSON(object.block) : undefined,
            evidence: isSet(object.evidence) ? EvidenceParams.fromJSON(object.evidence) : undefined,
            validator: isSet(object.validator) ? ValidatorParams.fromJSON(object.validator) : undefined,
            version: isSet(object.version) ? VersionParams.fromJSON(object.version) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.block !== undefined && (obj.block = message.block ? BlockParams.toJSON(message.block) : undefined);
        message.evidence !== undefined &&
            (obj.evidence = message.evidence ? EvidenceParams.toJSON(message.evidence) : undefined);
        message.validator !== undefined &&
            (obj.validator = message.validator ? ValidatorParams.toJSON(message.validator) : undefined);
        message.version !== undefined &&
            (obj.version = message.version ? VersionParams.toJSON(message.version) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseConsensusParams();
        message.block = (object.block !== undefined && object.block !== null)
            ? BlockParams.fromPartial(object.block)
            : undefined;
        message.evidence = (object.evidence !== undefined && object.evidence !== null)
            ? EvidenceParams.fromPartial(object.evidence)
            : undefined;
        message.validator = (object.validator !== undefined && object.validator !== null)
            ? ValidatorParams.fromPartial(object.validator)
            : undefined;
        message.version = (object.version !== undefined && object.version !== null)
            ? VersionParams.fromPartial(object.version)
            : undefined;
        return message;
    },
};
function createBaseBlockParams() {
    return { maxBytes: Long.ZERO, maxGas: Long.ZERO };
}
export const BlockParams = {
    encode(message, writer = _m0.Writer.create()) {
        if (!message.maxBytes.isZero()) {
            writer.uint32(8).int64(message.maxBytes);
        }
        if (!message.maxGas.isZero()) {
            writer.uint32(16).int64(message.maxGas);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBlockParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.maxBytes = reader.int64();
                    break;
                case 2:
                    message.maxGas = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            maxBytes: isSet(object.maxBytes) ? Long.fromValue(object.maxBytes) : Long.ZERO,
            maxGas: isSet(object.maxGas) ? Long.fromValue(object.maxGas) : Long.ZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.maxBytes !== undefined && (obj.maxBytes = (message.maxBytes || Long.ZERO).toString());
        message.maxGas !== undefined && (obj.maxGas = (message.maxGas || Long.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseBlockParams();
        message.maxBytes = (object.maxBytes !== undefined && object.maxBytes !== null)
            ? Long.fromValue(object.maxBytes)
            : Long.ZERO;
        message.maxGas = (object.maxGas !== undefined && object.maxGas !== null)
            ? Long.fromValue(object.maxGas)
            : Long.ZERO;
        return message;
    },
};
function createBaseEvidenceParams() {
    return { maxAgeNumBlocks: Long.ZERO, maxAgeDuration: undefined, maxBytes: Long.ZERO };
}
export const EvidenceParams = {
    encode(message, writer = _m0.Writer.create()) {
        if (!message.maxAgeNumBlocks.isZero()) {
            writer.uint32(8).int64(message.maxAgeNumBlocks);
        }
        if (message.maxAgeDuration !== undefined) {
            Duration.encode(message.maxAgeDuration, writer.uint32(18).fork()).ldelim();
        }
        if (!message.maxBytes.isZero()) {
            writer.uint32(24).int64(message.maxBytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEvidenceParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.maxAgeNumBlocks = reader.int64();
                    break;
                case 2:
                    message.maxAgeDuration = Duration.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.maxBytes = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            maxAgeNumBlocks: isSet(object.maxAgeNumBlocks) ? Long.fromValue(object.maxAgeNumBlocks) : Long.ZERO,
            maxAgeDuration: isSet(object.maxAgeDuration) ? Duration.fromJSON(object.maxAgeDuration) : undefined,
            maxBytes: isSet(object.maxBytes) ? Long.fromValue(object.maxBytes) : Long.ZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.maxAgeNumBlocks !== undefined && (obj.maxAgeNumBlocks = (message.maxAgeNumBlocks || Long.ZERO).toString());
        message.maxAgeDuration !== undefined &&
            (obj.maxAgeDuration = message.maxAgeDuration ? Duration.toJSON(message.maxAgeDuration) : undefined);
        message.maxBytes !== undefined && (obj.maxBytes = (message.maxBytes || Long.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseEvidenceParams();
        message.maxAgeNumBlocks = (object.maxAgeNumBlocks !== undefined && object.maxAgeNumBlocks !== null)
            ? Long.fromValue(object.maxAgeNumBlocks)
            : Long.ZERO;
        message.maxAgeDuration = (object.maxAgeDuration !== undefined && object.maxAgeDuration !== null)
            ? Duration.fromPartial(object.maxAgeDuration)
            : undefined;
        message.maxBytes = (object.maxBytes !== undefined && object.maxBytes !== null)
            ? Long.fromValue(object.maxBytes)
            : Long.ZERO;
        return message;
    },
};
function createBaseValidatorParams() {
    return { pubKeyTypes: [] };
}
export const ValidatorParams = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.pubKeyTypes) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidatorParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pubKeyTypes.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { pubKeyTypes: Array.isArray(object?.pubKeyTypes) ? object.pubKeyTypes.map((e) => String(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.pubKeyTypes) {
            obj.pubKeyTypes = message.pubKeyTypes.map((e) => e);
        }
        else {
            obj.pubKeyTypes = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = createBaseValidatorParams();
        message.pubKeyTypes = object.pubKeyTypes?.map((e) => e) || [];
        return message;
    },
};
function createBaseVersionParams() {
    return { app: Long.UZERO };
}
export const VersionParams = {
    encode(message, writer = _m0.Writer.create()) {
        if (!message.app.isZero()) {
            writer.uint32(8).uint64(message.app);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseVersionParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.app = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { app: isSet(object.app) ? Long.fromValue(object.app) : Long.UZERO };
    },
    toJSON(message) {
        const obj = {};
        message.app !== undefined && (obj.app = (message.app || Long.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseVersionParams();
        message.app = (object.app !== undefined && object.app !== null) ? Long.fromValue(object.app) : Long.UZERO;
        return message;
    },
};
function createBaseHashedParams() {
    return { blockMaxBytes: Long.ZERO, blockMaxGas: Long.ZERO };
}
export const HashedParams = {
    encode(message, writer = _m0.Writer.create()) {
        if (!message.blockMaxBytes.isZero()) {
            writer.uint32(8).int64(message.blockMaxBytes);
        }
        if (!message.blockMaxGas.isZero()) {
            writer.uint32(16).int64(message.blockMaxGas);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseHashedParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.blockMaxBytes = reader.int64();
                    break;
                case 2:
                    message.blockMaxGas = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            blockMaxBytes: isSet(object.blockMaxBytes) ? Long.fromValue(object.blockMaxBytes) : Long.ZERO,
            blockMaxGas: isSet(object.blockMaxGas) ? Long.fromValue(object.blockMaxGas) : Long.ZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.blockMaxBytes !== undefined && (obj.blockMaxBytes = (message.blockMaxBytes || Long.ZERO).toString());
        message.blockMaxGas !== undefined && (obj.blockMaxGas = (message.blockMaxGas || Long.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseHashedParams();
        message.blockMaxBytes = (object.blockMaxBytes !== undefined && object.blockMaxBytes !== null)
            ? Long.fromValue(object.blockMaxBytes)
            : Long.ZERO;
        message.blockMaxGas = (object.blockMaxGas !== undefined && object.blockMaxGas !== null)
            ? Long.fromValue(object.blockMaxGas)
            : Long.ZERO;
        return message;
    },
};
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}

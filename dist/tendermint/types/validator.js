/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PublicKey } from "../crypto/keys";
export const protobufPackage = "tendermint.types";
function createBaseValidatorSet() {
    return { validators: [], proposer: undefined, totalVotingPower: Long.ZERO };
}
export const ValidatorSet = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.validators) {
            Validator.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.proposer !== undefined) {
            Validator.encode(message.proposer, writer.uint32(18).fork()).ldelim();
        }
        if (!message.totalVotingPower.isZero()) {
            writer.uint32(24).int64(message.totalVotingPower);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidatorSet();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validators.push(Validator.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.proposer = Validator.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.totalVotingPower = reader.int64();
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
            validators: Array.isArray(object?.validators) ? object.validators.map((e) => Validator.fromJSON(e)) : [],
            proposer: isSet(object.proposer) ? Validator.fromJSON(object.proposer) : undefined,
            totalVotingPower: isSet(object.totalVotingPower) ? Long.fromValue(object.totalVotingPower) : Long.ZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.validators) {
            obj.validators = message.validators.map((e) => e ? Validator.toJSON(e) : undefined);
        }
        else {
            obj.validators = [];
        }
        message.proposer !== undefined &&
            (obj.proposer = message.proposer ? Validator.toJSON(message.proposer) : undefined);
        message.totalVotingPower !== undefined &&
            (obj.totalVotingPower = (message.totalVotingPower || Long.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseValidatorSet();
        message.validators = object.validators?.map((e) => Validator.fromPartial(e)) || [];
        message.proposer = (object.proposer !== undefined && object.proposer !== null)
            ? Validator.fromPartial(object.proposer)
            : undefined;
        message.totalVotingPower = (object.totalVotingPower !== undefined && object.totalVotingPower !== null)
            ? Long.fromValue(object.totalVotingPower)
            : Long.ZERO;
        return message;
    },
};
function createBaseValidator() {
    return { address: new Uint8Array(), pubKey: undefined, votingPower: Long.ZERO, proposerPriority: Long.ZERO };
}
export const Validator = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address.length !== 0) {
            writer.uint32(10).bytes(message.address);
        }
        if (message.pubKey !== undefined) {
            PublicKey.encode(message.pubKey, writer.uint32(18).fork()).ldelim();
        }
        if (!message.votingPower.isZero()) {
            writer.uint32(24).int64(message.votingPower);
        }
        if (!message.proposerPriority.isZero()) {
            writer.uint32(32).int64(message.proposerPriority);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidator();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.bytes();
                    break;
                case 2:
                    message.pubKey = PublicKey.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.votingPower = reader.int64();
                    break;
                case 4:
                    message.proposerPriority = reader.int64();
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
            address: isSet(object.address) ? bytesFromBase64(object.address) : new Uint8Array(),
            pubKey: isSet(object.pubKey) ? PublicKey.fromJSON(object.pubKey) : undefined,
            votingPower: isSet(object.votingPower) ? Long.fromValue(object.votingPower) : Long.ZERO,
            proposerPriority: isSet(object.proposerPriority) ? Long.fromValue(object.proposerPriority) : Long.ZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined &&
            (obj.address = base64FromBytes(message.address !== undefined ? message.address : new Uint8Array()));
        message.pubKey !== undefined && (obj.pubKey = message.pubKey ? PublicKey.toJSON(message.pubKey) : undefined);
        message.votingPower !== undefined && (obj.votingPower = (message.votingPower || Long.ZERO).toString());
        message.proposerPriority !== undefined &&
            (obj.proposerPriority = (message.proposerPriority || Long.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseValidator();
        message.address = object.address ?? new Uint8Array();
        message.pubKey = (object.pubKey !== undefined && object.pubKey !== null)
            ? PublicKey.fromPartial(object.pubKey)
            : undefined;
        message.votingPower = (object.votingPower !== undefined && object.votingPower !== null)
            ? Long.fromValue(object.votingPower)
            : Long.ZERO;
        message.proposerPriority = (object.proposerPriority !== undefined && object.proposerPriority !== null)
            ? Long.fromValue(object.proposerPriority)
            : Long.ZERO;
        return message;
    },
};
function createBaseSimpleValidator() {
    return { pubKey: undefined, votingPower: Long.ZERO };
}
export const SimpleValidator = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pubKey !== undefined) {
            PublicKey.encode(message.pubKey, writer.uint32(10).fork()).ldelim();
        }
        if (!message.votingPower.isZero()) {
            writer.uint32(16).int64(message.votingPower);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSimpleValidator();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pubKey = PublicKey.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.votingPower = reader.int64();
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
            pubKey: isSet(object.pubKey) ? PublicKey.fromJSON(object.pubKey) : undefined,
            votingPower: isSet(object.votingPower) ? Long.fromValue(object.votingPower) : Long.ZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.pubKey !== undefined && (obj.pubKey = message.pubKey ? PublicKey.toJSON(message.pubKey) : undefined);
        message.votingPower !== undefined && (obj.votingPower = (message.votingPower || Long.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseSimpleValidator();
        message.pubKey = (object.pubKey !== undefined && object.pubKey !== null)
            ? PublicKey.fromPartial(object.pubKey)
            : undefined;
        message.votingPower = (object.votingPower !== undefined && object.votingPower !== null)
            ? Long.fromValue(object.votingPower)
            : Long.ZERO;
        return message;
    },
};
var globalThis = (() => {
    if (typeof globalThis !== "undefined") {
        return globalThis;
    }
    if (typeof self !== "undefined") {
        return self;
    }
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof global !== "undefined") {
        return global;
    }
    throw "Unable to locate global object";
})();
function bytesFromBase64(b64) {
    if (globalThis.Buffer) {
        return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
    }
    else {
        const bin = globalThis.atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
            arr[i] = bin.charCodeAt(i);
        }
        return arr;
    }
}
function base64FromBytes(arr) {
    if (globalThis.Buffer) {
        return globalThis.Buffer.from(arr).toString("base64");
    }
    else {
        const bin = [];
        arr.forEach((byte) => {
            bin.push(String.fromCharCode(byte));
        });
        return globalThis.btoa(bin.join(""));
    }
}
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}

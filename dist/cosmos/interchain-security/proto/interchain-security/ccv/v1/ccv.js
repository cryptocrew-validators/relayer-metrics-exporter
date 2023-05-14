/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ValidatorUpdate } from "../../../../../../tendermint/abci/types";
export const protobufPackage = "interchain_security.ccv.v1";
function createBaseValidatorSetChangePacketData() {
    return { validatorUpdates: [], valsetUpdateId: Long.UZERO, slashAcks: [] };
}
export const ValidatorSetChangePacketData = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.validatorUpdates) {
            ValidatorUpdate.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (!message.valsetUpdateId.isZero()) {
            writer.uint32(16).uint64(message.valsetUpdateId);
        }
        for (const v of message.slashAcks) {
            writer.uint32(26).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidatorSetChangePacketData();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validatorUpdates.push(ValidatorUpdate.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.valsetUpdateId = reader.uint64();
                    break;
                case 3:
                    message.slashAcks.push(reader.string());
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
            validatorUpdates: Array.isArray(object?.validatorUpdates)
                ? object.validatorUpdates.map((e) => ValidatorUpdate.fromJSON(e))
                : [],
            valsetUpdateId: isSet(object.valsetUpdateId) ? Long.fromValue(object.valsetUpdateId) : Long.UZERO,
            slashAcks: Array.isArray(object?.slashAcks) ? object.slashAcks.map((e) => String(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.validatorUpdates) {
            obj.validatorUpdates = message.validatorUpdates.map((e) => e ? ValidatorUpdate.toJSON(e) : undefined);
        }
        else {
            obj.validatorUpdates = [];
        }
        message.valsetUpdateId !== undefined && (obj.valsetUpdateId = (message.valsetUpdateId || Long.UZERO).toString());
        if (message.slashAcks) {
            obj.slashAcks = message.slashAcks.map((e) => e);
        }
        else {
            obj.slashAcks = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = createBaseValidatorSetChangePacketData();
        message.validatorUpdates = object.validatorUpdates?.map((e) => ValidatorUpdate.fromPartial(e)) || [];
        message.valsetUpdateId = (object.valsetUpdateId !== undefined && object.valsetUpdateId !== null)
            ? Long.fromValue(object.valsetUpdateId)
            : Long.UZERO;
        message.slashAcks = object.slashAcks?.map((e) => e) || [];
        return message;
    },
};
function createBaseUnbondingOp() {
    return { id: Long.UZERO, unbondingConsumerChains: [] };
}
export const UnbondingOp = {
    encode(message, writer = _m0.Writer.create()) {
        if (!message.id.isZero()) {
            writer.uint32(8).uint64(message.id);
        }
        for (const v of message.unbondingConsumerChains) {
            writer.uint32(18).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUnbondingOp();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint64();
                    break;
                case 2:
                    message.unbondingConsumerChains.push(reader.string());
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
            id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
            unbondingConsumerChains: Array.isArray(object?.unbondingConsumerChains)
                ? object.unbondingConsumerChains.map((e) => String(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
        if (message.unbondingConsumerChains) {
            obj.unbondingConsumerChains = message.unbondingConsumerChains.map((e) => e);
        }
        else {
            obj.unbondingConsumerChains = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = createBaseUnbondingOp();
        message.id = (object.id !== undefined && object.id !== null) ? Long.fromValue(object.id) : Long.UZERO;
        message.unbondingConsumerChains = object.unbondingConsumerChains?.map((e) => e) || [];
        return message;
    },
};
function createBaseVSCMaturedPacketData() {
    return { valsetUpdateId: Long.UZERO };
}
export const VSCMaturedPacketData = {
    encode(message, writer = _m0.Writer.create()) {
        if (!message.valsetUpdateId.isZero()) {
            writer.uint32(8).uint64(message.valsetUpdateId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseVSCMaturedPacketData();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.valsetUpdateId = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { valsetUpdateId: isSet(object.valsetUpdateId) ? Long.fromValue(object.valsetUpdateId) : Long.UZERO };
    },
    toJSON(message) {
        const obj = {};
        message.valsetUpdateId !== undefined && (obj.valsetUpdateId = (message.valsetUpdateId || Long.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseVSCMaturedPacketData();
        message.valsetUpdateId = (object.valsetUpdateId !== undefined && object.valsetUpdateId !== null)
            ? Long.fromValue(object.valsetUpdateId)
            : Long.UZERO;
        return message;
    },
};
function createBaseUnbondingOpsIndex() {
    return { ids: [] };
}
export const UnbondingOpsIndex = {
    encode(message, writer = _m0.Writer.create()) {
        writer.uint32(10).fork();
        for (const v of message.ids) {
            writer.uint64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUnbondingOpsIndex();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.ids.push(reader.uint64());
                        }
                    }
                    else {
                        message.ids.push(reader.uint64());
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { ids: Array.isArray(object?.ids) ? object.ids.map((e) => Long.fromValue(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.ids) {
            obj.ids = message.ids.map((e) => (e || Long.UZERO).toString());
        }
        else {
            obj.ids = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = createBaseUnbondingOpsIndex();
        message.ids = object.ids?.map((e) => Long.fromValue(e)) || [];
        return message;
    },
};
function createBaseMaturedUnbondingOps() {
    return { ids: [] };
}
export const MaturedUnbondingOps = {
    encode(message, writer = _m0.Writer.create()) {
        writer.uint32(10).fork();
        for (const v of message.ids) {
            writer.uint64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMaturedUnbondingOps();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.ids.push(reader.uint64());
                        }
                    }
                    else {
                        message.ids.push(reader.uint64());
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { ids: Array.isArray(object?.ids) ? object.ids.map((e) => Long.fromValue(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.ids) {
            obj.ids = message.ids.map((e) => (e || Long.UZERO).toString());
        }
        else {
            obj.ids = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMaturedUnbondingOps();
        message.ids = object.ids?.map((e) => Long.fromValue(e)) || [];
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

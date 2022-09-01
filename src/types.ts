import type {
    TelemetryEventProperties,
    RawTelemetryEventProperties,
    TelemetryEventMeasurements
} from '@vscode/extension-telemetry'

export type EventTypes = 'sendEvent' | 'sendRawEvent' | 'sendDangerousEvent' | 'sendErrorEvent' | 'sendDangerousErrorEvent' | 'sendException' | 'sendDangerousException'

export interface TelemetryPayload {
    eventType: EventTypes
    eventName: string & Error
    properties?: TelemetryEventProperties | RawTelemetryEventProperties
    measurements?: TelemetryEventMeasurements
    sanitize?: boolean
}

export interface Events {
    __telemetryEvent__: TelemetryPayload
}

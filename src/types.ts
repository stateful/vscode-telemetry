import type {
    TelemetryEventProperties,
    RawTelemetryEventProperties,
    TelemetryEventMeasurements
} from '@vscode/extension-telemetry'

export type EventTypes = 'sendTelemetryEvent' | 'sendRawTelemetryEvent' | 'sendDangerousTelemetryEvent' | 'sendTelemetryErrorEvent' | 'sendDangerousTelemetryErrorEvent' | 'sendTelemetryException' | 'sendDangerousTelemetryException'
export interface TelemetryPayload {
    eventType: EventTypes
    eventName: string & Error
    properties?: TelemetryEventProperties | RawTelemetryEventProperties
    measurements?: TelemetryEventMeasurements
    sanitize?: boolean
}

export interface TelemetryEvent {
    __telemetryEvent__: TelemetryPayload
}

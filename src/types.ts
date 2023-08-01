import type {
    TelemetryEventProperties,
    TelemetryEventMeasurements
} from '@vscode/extension-telemetry'

export type EventTypes = 'sendTelemetryEvent' | 'sendRawTelemetryEvent' | 'sendDangerousTelemetryEvent' | 'sendTelemetryErrorEvent' | 'sendDangerousTelemetryErrorEvent'
export interface TelemetryPayload {
    eventType: EventTypes
    eventName: string & Error
    properties?: TelemetryEventProperties
    measurements?: TelemetryEventMeasurements
}

export interface TelemetryEvent {
    __telemetryEvent__: TelemetryPayload
}

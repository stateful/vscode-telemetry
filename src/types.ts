import type {
    TelemetryEventProperties,
    RawTelemetryEventProperties,
    TelemetryEventMeasurements
} from '@vscode/extension-telemetry'

export type EventTypes = 'sendEvent' | 'sendRawEvent' | 'sendDangerousEvent' | 'sendErrorEvent' | 'sendDangerousErrorEvent' | 'sendException' | 'sendDangerousException'

export interface Events {
    __telemetryEvent__: {
        eventType: EventTypes
        eventName: string & Error
        properties?: TelemetryEventProperties | RawTelemetryEventProperties
        measurements?: TelemetryEventMeasurements
        sanitize?: boolean
    }
}

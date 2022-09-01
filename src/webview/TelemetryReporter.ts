import type { WebviewApi } from 'vscode-webview'
import type {
    TelemetryEventProperties,
    RawTelemetryEventProperties,
    TelemetryEventMeasurements
} from '@vscode/extension-telemetry'

import { BaseTelemetryReporter } from '../BaseTelemetryReporter.js'
import type { Events, EventTypes } from '../types'

export class TangleTelemetryReporter extends BaseTelemetryReporter {
    static configure (vscode: WebviewApi<unknown>) {
        function handlerFunction (eventType: EventTypes) {
            return (
                eventName: string | Error,
                properties?: TelemetryEventProperties | RawTelemetryEventProperties,
                measurements?: TelemetryEventMeasurements,
                sanitize?: boolean
            ) => vscode.postMessage(<Events>{
                __telemetryEvent__: { eventType, eventName, properties, measurements, sanitize }
            })
        }

        this.reporter = {
            telemetryLevel: 'all',
            dispose: () => Promise.resolve({}),
            sendTelemetryEvent: handlerFunction('sendEvent'),
            sendRawTelemetryEvent: handlerFunction('sendRawEvent'),
            sendDangerousTelemetryEvent: handlerFunction('sendDangerousEvent'),
            sendTelemetryErrorEvent: handlerFunction('sendErrorEvent'),
            sendDangerousTelemetryErrorEvent: handlerFunction('sendDangerousErrorEvent'),
            sendTelemetryException: handlerFunction('sendException'),
            sendDangerousTelemetryException: handlerFunction('sendDangerousException')
        }
        return this.reporter
    }
}

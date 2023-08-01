import type { WebviewApi } from 'vscode-webview'
import type {
    TelemetryEventProperties,
    TelemetryEventMeasurements
} from '@vscode/extension-telemetry'

import { BaseTelemetryReporter } from '../BaseTelemetryReporter.js'
import { PAYLOAD_KEY } from '../constants'
import type { TelemetryEvent, EventTypes } from '../types'

export class TangleTelemetryReporter extends BaseTelemetryReporter {
    static configure (vscode: WebviewApi<unknown>) {
        function handlerFunction (eventType: EventTypes) {
            return (
                eventName: string | Error,
                properties?: TelemetryEventProperties,
                measurements?: TelemetryEventMeasurements
            ) => vscode.postMessage(<TelemetryEvent>{
                [PAYLOAD_KEY]: { eventType, eventName, properties, measurements }
            })
        }

        this.reporter = {
            telemetryLevel: 'all',
            dispose: () => Promise.resolve({}),
            onDidChangeTelemetryLevel: () => {
                throw new Error('onDidChangeTelemetryLevel not supported')
            },
            sendTelemetryEvent: handlerFunction('sendTelemetryEvent'),
            sendRawTelemetryEvent: handlerFunction('sendRawTelemetryEvent'),
            sendDangerousTelemetryEvent: handlerFunction('sendDangerousTelemetryEvent'),
            sendTelemetryErrorEvent: handlerFunction('sendTelemetryErrorEvent'),
            sendDangerousTelemetryErrorEvent: handlerFunction('sendDangerousTelemetryErrorEvent'),
        }
        return this.reporter
    }
}

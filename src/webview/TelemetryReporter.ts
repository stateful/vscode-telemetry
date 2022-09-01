import Channel from 'tangle/webviews'
import type { Webview } from 'vscode'
import type {
    TelemetryEventProperties,
    RawTelemetryEventProperties,
    TelemetryEventMeasurements
} from '@vscode/extension-telemetry'

import { BaseTelemetryReporter } from '../BaseTelemetryReporter.js'
import { CHANNEL_NAME } from '../constants'
import type { Events, EventTypes } from '../types'

export class TangleTelemetryReporter extends BaseTelemetryReporter {
    static configure (vscode: Webview) {
        const channel = new Channel<Events>(CHANNEL_NAME)
        const client = channel.attach(vscode)

        function handlerFunction (eventType: EventTypes) {
            return (
                eventName: string | Error,
                properties?: TelemetryEventProperties | RawTelemetryEventProperties,
                measurements?: TelemetryEventMeasurements,
                sanitize?: boolean
            ) => client.emit('telemetryEvent', { eventType, eventName, properties, measurements, sanitize })
        }

        this.reporter = {
            telemetryLevel: 'all',
            dispose: () => Promise.resolve({}),
            sendTelemetryEvent: handlerFunction('sendTelemetryEvent'),
            sendRawTelemetryEvent: handlerFunction('sendRawTelemetryEvent'),
            sendDangerousTelemetryEvent: handlerFunction('sendDangerousTelemetryEvent'),
            sendTelemetryErrorEvent: handlerFunction('sendTelemetryErrorEvent'),
            sendDangerousTelemetryErrorEvent: handlerFunction('sendDangerousTelemetryErrorEvent'),
            sendTelemetryException: handlerFunction('sendTelemetryException'),
            sendDangerousTelemetryException: handlerFunction('sendDangerousTelemetryException')
        }
        return this.reporter
    }
}

import { TangleTelemetryReporter } from './TelemetryReporter'

declare global {
    interface Window {
        TelemetryReporter: TangleTelemetryReporter
    }
}

window.TelemetryReporter = TangleTelemetryReporter

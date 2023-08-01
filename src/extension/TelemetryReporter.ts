import ExtensionTelemetryReporter, { type ReplacementOption } from '@vscode/extension-telemetry'

import { BaseTelemetryReporter } from '../BaseTelemetryReporter.js'

/**
 * Telemetry reporter to be imported within a VS Code extension
 */
export class TelemetryReporter extends BaseTelemetryReporter {
    /**
     * @param key The app insights key
	 * @param replacementOptions A list of replacement options for the app insights client. This allows the sender to filter out any sensitive or unnecessary information from the telemetry server.
     */
    static configure (key: string, replacementOptions: ReplacementOption[] = []) {
        this.reporter = new ExtensionTelemetryReporter(key, replacementOptions)
        return this.reporter
    }
}

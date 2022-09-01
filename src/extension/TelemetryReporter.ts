import type vscode from 'vscode'
import ExtensionTelemetryReporter from '@vscode/extension-telemetry'

import { BaseTelemetryReporter } from '../BaseTelemetryReporter.js'

/**
 * Telemetry reporter to be imported within a VS Code extension
 */
export class TelemetryReporter extends BaseTelemetryReporter {
    static configure (context: vscode.ExtensionContext, key: string) {
        const { name, publisher, version } = context.extension.packageJSON
        const extensionId = `${publisher}.${name}`
        this.reporter = new ExtensionTelemetryReporter(extensionId, version, key)
        return this.reporter
    }
}

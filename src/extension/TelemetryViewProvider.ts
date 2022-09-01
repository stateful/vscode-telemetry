import vscode from 'vscode'

import { TelemetryReporter } from './TelemetryReporter'
import type { TelemetryPayload } from '../types'

export class TelemetryViewProvider implements vscode.WebviewViewProvider {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    resolveWebviewTelemetryView (webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken) {
        throw new Error ('resolveWebviewTelemetryView not implemented!')
    }

    async resolveWebviewView (webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken) {
        await this.resolveWebviewTelemetryView(webviewView, context, token)
        webviewView.webview.onDidReceiveMessage((e: TelemetryPayload) => (
            TelemetryReporter[e.eventType](e.eventName, e.properties, e.measurements, e.sanitize))
        )
    }
}

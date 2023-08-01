import vscode from 'vscode'

import { TelemetryReporter } from './TelemetryReporter'
import { PAYLOAD_KEY } from '../constants'
import type { TelemetryEvent } from '../types'

export class TelemetryViewProvider implements vscode.WebviewViewProvider {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    resolveWebviewTelemetryView (webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken) {
        throw new Error ('resolveWebviewTelemetryView not implemented!')
    }

    async resolveWebviewView (webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken) {
        await this.resolveWebviewTelemetryView(webviewView, context, token)
        webviewView.webview.onDidReceiveMessage((e: TelemetryEvent) => {
            const payload = e[PAYLOAD_KEY]

            if (!payload) {
                return
            }

            TelemetryReporter[payload.eventType](
                payload.eventName,
                payload.properties,
                payload.measurements
            )
        })
    }
}

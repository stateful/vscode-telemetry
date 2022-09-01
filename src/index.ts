import vscode from 'vscode'

import { TelemetryReporter } from './extension/TelemetryReporter'
import type { TelemetryPayload } from './types'

export const createWebviewTelemetryPanel = (
    viewType: string,
    title: string,
    showOptions: vscode.ViewColumn | { readonly viewColumn: vscode.ViewColumn; readonly preserveFocus?: boolean },
    options?: vscode.WebviewPanelOptions & vscode.WebviewOptions
) => {
    const panel = vscode.window.createWebviewPanel(viewType, title, showOptions, options)
    panel.webview.onDidReceiveMessage((e: TelemetryPayload) => (
        TelemetryReporter[e.eventType](e.eventName, e.properties, e.measurements, e.sanitize))
    )

    return panel
}

export * from './extension/TelemetryReporter'
export * from './extension/TelemetryViewProvider'

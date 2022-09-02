import vscode from 'vscode'

import { TelemetryReporter } from './extension/TelemetryReporter'
import { PAYLOAD_KEY } from './constants'
import type { TelemetryEvent } from './types'

export const createWebviewTelemetryPanel = (
    viewType: string,
    title: string,
    showOptions: vscode.ViewColumn | { readonly viewColumn: vscode.ViewColumn; readonly preserveFocus?: boolean },
    options?: vscode.WebviewPanelOptions & vscode.WebviewOptions
) => {
    const panel = vscode.window.createWebviewPanel(viewType, title, showOptions, options)
    panel.webview.onDidReceiveMessage((e: TelemetryEvent) => {
        const payload = e[PAYLOAD_KEY]

        if (!payload) {
            return
        }

        TelemetryReporter[payload.eventType](
            payload.eventName,
            payload.properties,
            payload.measurements,
            payload.sanitize
        )
    })

    return panel
}

export * from './extension/TelemetryReporter'
export * from './extension/TelemetryViewProvider'

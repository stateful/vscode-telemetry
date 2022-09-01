import vscode from 'vscode'

export * from './extension/TelemetryReporter'
export * from './extension/TelemetryViewProvider'

export const createWebviewTelemetryPanel = (
    viewType: string,
    title: string,
    showOptions: vscode.ViewColumn | { readonly viewColumn: vscode.ViewColumn; readonly preserveFocus?: boolean },
    options?: vscode.WebviewPanelOptions & vscode.WebviewOptions
) => {
    const panel = vscode.window.createWebviewPanel(viewType, title, showOptions, options)
    panel.webview.onDidReceiveMessage((e) => {
        console.log(123, e)
    })

    return panel
}

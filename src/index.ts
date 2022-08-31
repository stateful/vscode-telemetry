import vscode from 'vscode'

export * from './TelemetryReporter'
export * from './TelemetryViewProvider'

export const createWebviewTelemetryPanel = (
    viewType: string,
    title: string,
    showOptions: vscode.ViewColumn | { readonly viewColumn: vscode.ViewColumn; readonly preserveFocus?: boolean },
    options?: vscode.WebviewPanelOptions & vscode.WebviewOptions
) => {
    const panel = vscode.window.createWebviewPanel(viewType, title, showOptions, options)
    return {
        ...panel,
        webview: {
            ...panel.webview,
            get html () {
                return panel.webview.html
            },
            set html (html: string) {
                panel.webview.html = html + 'Hello World!'
            }
        }
    }
}

import vscode from 'vscode'

export class TelemetryViewProvider implements vscode.WebviewViewProvider {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    resolveWebviewTelemetryView (webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken) {
        throw new Error ('resolveWebviewTelemetryView not implemented!')
    }

    async resolveWebviewView (webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken) {
        await this.resolveWebviewTelemetryView(webviewView, context, token)
        webviewView.webview.onDidReceiveMessage((e) => {
            console.log(321, e)
        })
    }
}

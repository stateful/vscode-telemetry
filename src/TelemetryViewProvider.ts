import vscode from 'vscode'
// import { TelemetryReporter } from './TelemetryReporter'

export class TelemetryViewProvider implements vscode.WebviewViewProvider {
    resolveWebviewView (webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken) {
        this.resolveWebviewTelemetryView(webviewView, context, token)
        webviewView.webview.html += 'here I come'
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    resolveWebviewTelemetryView (webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken) {
        throw new Error ('resolveWebviewTelemetryView not implemented')
    }
}

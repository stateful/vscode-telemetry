import vscode from 'vscode'

export * from './extension/TelemetryReporter'
export * from './TelemetryViewProvider'

// eslint-disable-next-line quotes
const SCRIPT = `__WEBVIEW_SCRIPT__`

export const createWebviewTelemetryPanel = (
    viewType: string,
    title: string,
    showOptions: vscode.ViewColumn | { readonly viewColumn: vscode.ViewColumn; readonly preserveFocus?: boolean },
    options?: vscode.WebviewPanelOptions & vscode.WebviewOptions
) => {
    const panel = vscode.window.createWebviewPanel(viewType, title, showOptions, options)
    const webview = new Proxy(panel.webview, {
        get: (webview, prop) => {
            const value = webview[prop as keyof typeof webview]
            console.log('GET ', prop)

            if (typeof value === 'function') {
                return value.bind(panel.webview)
            }
            return value
        },
        set: (webview, prop, newValue) => {
            if (prop === 'html') {
                const nonceMatch = (newValue as string).match(/'nonce-(.+)'/g)
                const nonce = nonceMatch ? ` nonce="${nonceMatch[0].slice(7, -1)}"` : ''
                const scriptTag = `<script${nonce}>${SCRIPT}</script>`
                webview[prop] = newValue.replace('</body>', '').replace('</html>', '') + scriptTag + '</body></html>'
                return true
            } else if (prop === 'options') {
                webview[prop] = newValue
                return true
            }
            return false
        }
    })
    return new Proxy(panel, {
        get: (target, prop) => {
            if (prop === 'webview') {
                return webview
            }

            const value = target[prop as keyof typeof target]
            if (typeof value === 'function') {
                return value.bind(panel)
            }
            return target[prop as keyof typeof target]
        }
    })
}

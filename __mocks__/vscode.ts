/* c8 ignore start */
import { vi } from 'vitest'

export const webview = {
    onDidReceiveMessage: vi.fn()
}

export const window = {
    createWebviewPanel: vi.fn().mockReturnValue({ some: 'panel', webview })
}

export default {
    window,
    postMessage: vi.fn()
}
/* c8 ignore end */

export function isAndroid(): boolean {
	return typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent)
}

export function isSmallIOS(): boolean {
	return typeof navigator !== 'undefined' && /iPhone|iPod/.test(navigator.userAgent)
}

export function isLargeIOS(): boolean {
	return (
		typeof navigator !== 'undefined' &&
		(/iPad/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))
	)
}

export function isIOS(): boolean {
	return isSmallIOS() || isLargeIOS()
}

export function isMobile(): boolean {
	return isAndroid() || isIOS()
}

/*In-App Mobile Browser
https://docs.skymavis.com/api/wallet/injected-provider#mobile-app
*/
export function isMobileApp(): boolean{
  return typeof window !== 'undefined' && Boolean(window.ronin) && Boolean(window.isWalletApp)
}

declare global {
	interface Window {
		ronin?: any,
		isWalletApp?: boolean;
	}
}
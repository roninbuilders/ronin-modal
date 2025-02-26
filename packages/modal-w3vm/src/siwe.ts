import { getCore, setCore } from "@roninbuilders/modal-ui"

export function setIsSIWE(isEnabled: boolean) {
	setCore.is_SIWE_enabled(isEnabled)
}

export const getIsSIWE = getCore.is_SIWE_enabled
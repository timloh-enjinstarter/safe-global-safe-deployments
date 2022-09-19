import CompatibilityFallbackHandler from './assets/v1.3.0/compatibility_fallback_handler.json'
import { DeploymentFilter, SingletonDeployment } from './types'
import { findDeployment } from './utils'

// This is a sorted array (by preference)
const defaultCallbackHandlerDeployments: SingletonDeployment[] = []

export const getDefaultCallbackHandlerDeployment = (filter?: DeploymentFilter): SingletonDeployment | undefined => {
    return findDeployment(filter, defaultCallbackHandlerDeployments)
}

// This is a sorted array (by preference)
const compatFallbackHandlerDeployments: SingletonDeployment[] = [
  CompatibilityFallbackHandler
]

export const getCompatibilityFallbackHandlerDeployment = (filter?: DeploymentFilter): SingletonDeployment | undefined => {
    return findDeployment(filter, compatFallbackHandlerDeployments)
}

// This is a sorted array (by preference)
const fallbackHandlerDeployments: SingletonDeployment[] = [
  CompatibilityFallbackHandler
]

export const getFallbackHandlerDeployment = (filter?: DeploymentFilter): SingletonDeployment | undefined => {
    return findDeployment(filter, fallbackHandlerDeployments)
}
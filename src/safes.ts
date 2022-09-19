import GnosisSafeL2130 from './assets/v1.3.0/gnosis_safe_l2.json'
import GnosisSafe130 from './assets/v1.3.0/gnosis_safe.json'
import { DeploymentFilter, SingletonDeployment } from './types'
import { findDeployment } from './utils'

// This is a sorted array (newest to oldest), exported for tests
export const _safeDeployments: SingletonDeployment[] = [
  GnosisSafe130
]

export const getSafeSingletonDeployment = (filter?: DeploymentFilter): SingletonDeployment | undefined => {
    return findDeployment(filter, _safeDeployments)
}

// This is a sorted array (newest to oldest), exported for tests
export const _safeL2Deployments: SingletonDeployment[] = [
  GnosisSafeL2130
]

export const getSafeL2SingletonDeployment = (filter?: DeploymentFilter): SingletonDeployment | undefined => {
    return findDeployment(filter, _safeL2Deployments)
}
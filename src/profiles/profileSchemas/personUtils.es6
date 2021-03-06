'use strict'

export function getName(profile) {
  if (!profile) {
    return null
  }

  let name = null
  if (profile.givenName || profile.familyName) {
    name = ''
    if (profile.givenName) {
      name = profile.givenName
    }
    if (profile.familyName) {
      name += ' ' + profile.familyName
    }
  } else if (profile.name) {
    name = profile.name
  }
  return name
}

export function getGivenName(profile) {
  if (!profile) {
    return null
  }

  let givenName = null
  if (profile.givenName) {
    givenName = profile.givenName
  } else if (profile.name) {
    let nameParts = profile.name.split(' ')
    givenName = nameParts.slice(0, -1).join(' ')
  }
  return givenName
}

export function getFamilyName(profile) {
  if (!profile) {
    return null
  }

  let familyName = null
  if (profile.familyName) {
    familyName = profile.familyName
  } else if (profile.name) {
    let nameParts = profile.name.split(' ')
    familyName = nameParts.pop()
  }
  return familyName
}

export function getDescription(profile) {
  if (!profile) {
    return null
  }

  let description = null
  if (profile.description) {
    description = profile.description
  }
  return description
}

export function getAvatarUrl(profile) {
  if (!profile) {
    return null
  }

  let avatarContentUrl = null
  if (profile.image) {
    profile.image.map(function(image) {
      if (image.name === 'avatar') {
        avatarContentUrl = image.contentUrl
        return
      }
    })
  }
  return avatarContentUrl
}

export function getVerifiedAccounts(profile, verifications) {
  if (!profile) {
    return null
  }

  let filteredAccounts = []
  if (profile.hasOwnProperty('account') && verifications) {
    profile.account.map(function(account) {
      let accountIsValid = false
      let proofUrl = null

      verifications.map(function(verification) {
        if (verification.hasOwnProperty('proof_url')) {
          verification.proofUrl = verification.proof_url
        }
        if (verification.valid
            && verification.service === account.service
            && verification.identifier === account.identifier
            && verification.proofUrl) {
          accountIsValid = true
          proofUrl = verification.proofUrl
        }
      })
      
      if (accountIsValid) {
        account.proofUrl = proofUrl
        filteredAccounts.push(account)
      }
    })
  }
  return filteredAccounts
}

export function getOrganizations(profile) {
  if (!profile) {
    return null
  }

  let organizations = []

  if (profile.hasOwnProperty('worksFor')) {
    return profile.worksFor
  }

  return organizations
}

export function getConnections(profile) {
  if (!profile) {
    return null
  }

  let connections = []

  if (profile.hasOwnProperty('knows')) {
    connections = profile.knows
  }

  return connections
}

export function getAddress(profile) {
  if (!profile) {
    return null
  }

  let addressString = null

  if (profile.hasOwnProperty('address')) {
    let addressParts = []

    if (profile.address.hasOwnProperty('streetAddress')) {
      addressParts.push(profile.address.streetAddress)
    }
    if (profile.address.hasOwnProperty('addressLocality')) {
      addressParts.push(profile.address.addressLocality)
    }
    if (profile.address.hasOwnProperty('postalCode')) {
      addressParts.push(profile.address.postalCode)
    }
    if (profile.address.hasOwnProperty('addressCountry')) {
      addressParts.push(profile.address.addressCountry)
    }

    if (addressParts.length) {
      addressString = addressParts.join(', ')
    }
  }

  return addressString
}

export function getBirthDate(profile) {
  if (!profile) {
    return null
  }

  let monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  let birthDateString = null
  
  if (profile.hasOwnProperty('birthDate')) {
    let date = new Date(profile.birthDate)
    birthDateString = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  return birthDateString
}
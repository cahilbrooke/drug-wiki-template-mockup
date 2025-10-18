function redirect(destination) {
    window.location.href = destination;

  const currentOrigin = window.location.origin;
  const destURL = new URL(destination, currentOrigin);

  // --- Define your allowed URLs for UTM ---
  const trackedDomains = [
    "drug-wiki.com",
    "drug-diary.com",
    "substanceguide.com"
  ];

  // --- Define your UTM params ---
  const utmParams = {
    utm_source: "mysite",
    utm_medium: "referral",
    utm_campaign: "default"
  };

  const isLocal =
    destURL.origin === currentOrigin ||
    destURL.hostname === window.location.hostname;

  const isTrackedDomain = trackedDomains.some(domain =>
    destURL.hostname.includes(domain)
  );

  // --- Add UTM params only if NOT local OR domain matches tracked list ---
  if (!isLocal || isTrackedDomain) {
    for (const [key, value] of Object.entries(utmParams)) {
      if (!destURL.searchParams.has(key)) {
        destURL.searchParams.set(key, value);
      }
    }
  }

  // --- Redirect to the final destination ---
  window.location.href = destURL.toString();
}

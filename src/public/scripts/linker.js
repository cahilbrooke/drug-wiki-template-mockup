function redirect(destination) {
  const currentOrigin = window.location.origin;
  const currentHostname = window.location.hostname;
  let destURL = new URL(destination, currentOrigin);

  const trackedDomains = [
    "drug-wiki.com",
    "drug-diary.com",
    "substanceguide.com"
  ];

  const isTrackedDomain = trackedDomains.some(domain =>
    destURL.hostname.includes(domain)
  );

  // Only add referrer if destination is a tracked domain AND not same as current
  if (isTrackedDomain && destURL.hostname !== currentHostname) {
    destURL.searchParams.set("referrer", "internal");
  }

  window.location.href = destURL.toString();
}

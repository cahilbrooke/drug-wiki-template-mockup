function redirect(destination) {
  const currentOrigin = window.location.origin;
  let destURL = new URL(destination, currentOrigin);

  const trackedDomains = [
    "drug-wiki.com",
    "drug-diary.com",
    "substanceguide.com"
  ];

  const isTrackedDomain = trackedDomains.some(domain =>
    destURL.hostname.includes(domain)
  );

  console.log(isTrackedDomain);

  // Add ?referrer=internal if domain matches tracked list
  if (isTrackedDomain) {
    destURL.searchParams.set("referrer", "internal");
  }

  let target = destURL.toString();

  window.location.href = target;
}

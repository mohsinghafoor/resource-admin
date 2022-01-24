export const getLiteralLink = (link: string) => {
  if (!link.startsWith("https://") && !link.startsWith("http://")) {
    return "https://" + link
  }
  return link
}

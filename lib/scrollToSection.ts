export function scrollToSection(sectionId: string) {
  const section = document.getElementById(sectionId);

  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }
}

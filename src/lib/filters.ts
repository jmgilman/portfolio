type TaggableElement = HTMLElement & {
  dataset: {
    tags?: string;
    title?: string;
    description?: string;
  };
};

type TagFilterConfig = {
  tagButtonSelector: string;
  itemSelector: string;
  containersToToggle?: string[];
  noResultsSelector?: string;
  activeClass?: string;
};

type SearchFilterConfig = {
  searchInputSelector: string;
  tagButtonSelector: string;
  itemSelector: string;
  containerSelector: string;
  noResultsSelector?: string;
  activeClass?: string;
};

const normalize = (value: string | undefined) => (value || '').toLowerCase().trim();

export function initTagFilter(config: TagFilterConfig) {
  const {
    tagButtonSelector,
    itemSelector,
    containersToToggle = [],
    noResultsSelector,
    activeClass = 'tag-active',
  } = config;

  const controller = new AbortController();
  const { signal } = controller;
  const tagButtons = Array.from(document.querySelectorAll<HTMLButtonElement>(tagButtonSelector));
  const items = Array.from(document.querySelectorAll<TaggableElement>(itemSelector));
  const containers = containersToToggle
    .map((selector) => document.querySelector<HTMLElement>(selector))
    .filter((el): el is HTMLElement => Boolean(el));
  const noResults = noResultsSelector
    ? document.querySelector<HTMLElement>(noResultsSelector)
    : null;

  let selectedTags: string[] = [];

  const applyFilters = () => {
    let visibleCount = 0;

    items.forEach((item) => {
      const tags = normalize(item.dataset.tags)
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);

      const matchesTags =
        selectedTags.length === 0 || selectedTags.some((tag) => tags.includes(tag));

      item.style.display = matchesTags ? '' : 'none';
      if (matchesTags) visibleCount++;
    });

    containers.forEach((container) => {
      container.classList.toggle('hidden', visibleCount === 0);
    });

    if (noResults) {
      noResults.classList.toggle('hidden', visibleCount !== 0);
    }
  };

  const toggleTag = (tag: string, button: HTMLElement) => {
    if (selectedTags.includes(tag)) {
      selectedTags = selectedTags.filter((t) => t !== tag);
      button.classList.remove(activeClass);
    } else {
      selectedTags.push(tag);
      button.classList.add(activeClass);
    }
    applyFilters();
  };

  tagButtons.forEach((button) => {
    const tag = normalize(button.dataset.tag);
    if (!tag) return;

    button.addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        toggleTag(tag, button);
      },
      { signal }
    );
  });

  applyFilters();

  return () => controller.abort();
}

export function initSearchAndTagFilter(config: SearchFilterConfig) {
  const {
    searchInputSelector,
    tagButtonSelector,
    itemSelector,
    containerSelector,
    noResultsSelector,
    activeClass = 'tag-active',
  } = config;

  const controller = new AbortController();
  const { signal } = controller;
  const searchInput = document.querySelector<HTMLInputElement>(searchInputSelector);
  const tagButtons = Array.from(document.querySelectorAll<HTMLButtonElement>(tagButtonSelector));
  const items = Array.from(document.querySelectorAll<TaggableElement>(itemSelector));
  const container = document.querySelector<HTMLElement>(containerSelector);
  const noResults = noResultsSelector
    ? document.querySelector<HTMLElement>(noResultsSelector)
    : null;

  let selectedTags: string[] = [];

  const applyFilters = () => {
    const searchTerm = normalize(searchInput?.value);
    let visibleCount = 0;

    items.forEach((item) => {
      const tags = normalize(item.dataset.tags)
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);
      const combinedText = `${item.dataset.title || ''} ${item.dataset.description || ''}`;

      const matchesSearch = searchTerm === '' || combinedText.toLowerCase().includes(searchTerm);
      const matchesTags =
        selectedTags.length === 0 || selectedTags.some((tag) => tags.includes(tag));

      const show = matchesSearch && matchesTags;
      item.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    if (container) {
      container.classList.toggle('hidden', visibleCount === 0);
    }

    if (noResults) {
      noResults.classList.toggle('hidden', visibleCount !== 0);
    }
  };

  const toggleTag = (tag: string, button: HTMLElement) => {
    if (selectedTags.includes(tag)) {
      selectedTags = selectedTags.filter((t) => t !== tag);
      button.classList.remove(activeClass);
    } else {
      selectedTags.push(tag);
      button.classList.add(activeClass);
    }
    applyFilters();
  };

  tagButtons.forEach((button) => {
    const tag = normalize(button.dataset.tag);
    if (!tag) return;

    button.addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        toggleTag(tag, button);
      },
      { signal }
    );
  });

  searchInput?.addEventListener('input', applyFilters, { signal });

  applyFilters();

  return () => controller.abort();
}

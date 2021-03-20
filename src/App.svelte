<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let count: number = 0;
  let darkMode: boolean;
  let darkModeReady = false;

  onMount(() => {
    darkMode = document.documentElement.classList.contains("dark");
    document.body.classList.add("transition", "ease-in-out", "duration-500");
    darkModeReady = true;

    const interval = setInterval(() => count++, 1000);
    return () => {
      clearInterval(interval);
    };
  });
</script>

<style lang="postcss" global>
  :local(.wrapper) {
    @apply bg-gray-100 dark:bg-gray-900;
  }
  :local(div) {
    & header {
      font-size: calc(10px + 2vmin);
    }

    & img {
      height: 36vmin;
      animation: App-logo-spin infinite 1.6s ease-in-out alternate;
    }
  }

  @keyframes App-logo-spin {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.06);
    }
  }

  :local(.toggle) {
    & input[type="checkbox"] {
      display: none;
    }
    & label {
      @apply inline-block cursor-pointer relative transition-all ease-in-out duration-300 w-12 h-6 rounded-3xl border border-solid border-gray-700 bg-yellow-100;
    }

    & label::after {
      /* content: ' '; */
      content: attr(data-dark);
      @apply flex items-center justify-center rounded-full cursor-pointer absolute top-px left-px transition-all ease-in-out duration-300 w-5 h-5 bg-transparent align-middle;
    }

    & input[type="checkbox"]:checked ~ label {
      @apply bg-gray-500;
    }

    & input[type="checkbox"]:checked ~ label::after {
      transform: translateX(24px);
    }
  }
</style>

<div class="wrapper">
  <div class="flex justify-end h-16 p-8">
    {#if darkModeReady}
      <div class="h-8 toggle" in:fade="{{ duration: 800 }}">
        <input
          type="checkbox"
          id="toggle"
          bind:checked="{darkMode}"
          on:change="{() => document.documentElement.classList.toggle('dark')}"
        />
        <label
          id="darkicon"
          title="Toggle dark mode"
          for="toggle"
          data-dark="{darkMode ? '🌒' : '🌞'}"></label>
      </div>
    {/if}
  </div>

  <div class="text-center">
    <header
      class="flex flex-col items-center justify-center min-h-screen text-gray-700 "
    >
      <img src="/logo.svg" alt="logo" class="mb-12 pointer-events-none" />
      <p>Edit <code>src/App.svelte</code> and save to reload.</p>
      <p>Page has been open for <code>{count}</code> seconds.</p>
      <p>
        <a
          class="text-red-500"
          href="https://svelte.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Svelte
        </a>
      </p>
    </header>
  </div>
</div>

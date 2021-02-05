<script>
  import { onMount } from "svelte";

  let count: number = 0;
  onMount(() => {
    const interval = setInterval(() => count++, 1000);
    return () => {
      clearInterval(interval);
    };
  });
</script>

<style>
  div header {
    font-size: calc(10px + 2vmin);
  }
  div img {
    height: 36vmin;
    animation: App-logo-spin infinite 1.6s ease-in-out alternate;
  }
  @keyframes App-logo-spin {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.06);
    }
  }
</style>

<div class="text-center">
  <header
    class="flex flex-col items-center justify-center min-h-screen text-gray-700 bg-gray-100"
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

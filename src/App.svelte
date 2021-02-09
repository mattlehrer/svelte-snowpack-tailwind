<script>
  import { Auth, Hub } from "aws-amplify";
  import { onMount } from "svelte";

  $: formState = {
    username: "",
    email: "",
    password: "",
    authCode: "",
    formType: "signUp",
  };

  let user: any = {};

  async function signUp() {
    const response = await Auth.signUp({
      username: formState.username,
      password: formState.password,
      attributes: {
        email: formState.email,
      },
    });
    formState.formType = "confirmSignUp";
    console.log({ response });
  }

  async function confirmSignUp() {
    const response = await Auth.confirmSignUp(
      formState.username,
      formState.authCode,
    );
    formState.formType = "signIn";
    console.log({ response });
  }

  async function signIn() {
    const response = await Auth.signIn(formState.username, formState.password);
    formState.formType = "signedIn";
    console.log({ response });
  }

  onMount(async () => {
    try {
      user = await Auth.currentAuthenticatedUser();
      console.log({ user });
      formState.formType = "signedIn";
    } catch (error) {
      console.log({ error });
    }

    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signIn":
          console.log("user signed in");
          break;
        case "signUp":
          console.log("user signed up");
          break;
        case "signOut":
          formState.formType = "signUp";
          console.log("user signed out");
          break;
        case "signIn_failure":
          console.log("user sign in failed");
          break;
        case "configured":
          console.log("the Auth module is configured");
      }
    });
  });
</script>

<style>
  div {
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
</style>

<div class="max-w-xs mx-auto my-16">
  {#if formState?.formType === "signUp"}
    <div>
      <input
        name="username"
        bind:value="{formState.username}"
        type="text"
        placeholder="username"
      />
      <input
        name="email"
        type="text"
        bind:value="{formState.email}"
        placeholder="email"
      />
      <input
        name="password"
        type="password"
        bind:value="{formState.password}"
        placeholder="password"
      />
      <button on:click="{signUp}">Sign Up</button>
      <button on:click="{() => (formState.formType = 'signIn')}">Sign In</button
      >
    </div>
  {:else if formState?.formType === "confirmSignUp"}
    <div>
      <input
        name="authCode"
        type="text"
        bind:value="{formState.authCode}"
        placeholder="Confirmation Code"
      />
      <button on:click="{confirmSignUp}">Confirm Sign Up</button>
    </div>
  {:else if formState?.formType === "signIn"}
    <div>
      <input
        name="username"
        type="text"
        bind:value="{formState.username}"
        placeholder="username"
      />
      <input
        name="password"
        type="password"
        bind:value="{formState.password}"
        placeholder="password"
      />
      <button on:click="{signIn}">Sign In</button>
    </div>
  {:else if formState?.formType === "signedIn"}
    <div>
      <h2>You are signed in</h2>
      <button on:click="{() => Auth.signOut()}">Sign Out</button>
    </div>
  {:else}
    <h2>Loading</h2>
    JSON.stringify(formState, null, 2)
  {/if}
</div>

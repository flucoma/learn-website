<script context="module">
    /** @type {import('@sveltejs/kit').ErrorLoad} */
    export function load({ error, status }) {
      return {
        props: {
          title: `${status}: ${error.message}`,
          status: status,
          error: error
        }
      };
    }
  </script>
  
  <script>
    export let title;
    export let status;
    export let error;
  </script>
  
<div class='error'>
    <p class='message'>{ error.message }</p>
    <p>The page you tried to go to probably doesn't exist. Sorry!</p>
</div>

<style>
    .message {
        font-weight: bold;
    }
</style>
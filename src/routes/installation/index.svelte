<h1>
    Choose your creating coding environment
</h1>

<div class='installations'>
    <a href='/installation/max'>
        <h2>Max</h2>
        <img class='max' src='/img/max-logo.svg' alt='Max Logo' />

    </a>
    <a href='/installation/sc'>
        <h2>SuperCollider</h2>
        <img src='/img/sc-logo.svg' alt='SuperCollider Logo' />
    </a>
    <a href='/installation/pd'>
        <h2>PureData</h2>
        <img src='/img/pd-logo.png' alt='PureData Logo' />

    </a>
</div>

<style>
    .installations {
        display: flex;
        flex-direction: column;
    }

    a {
        display: grid;
        grid-template-columns: auto auto;
        place-items: center;
        gap: 1em;
    }

    img {
        width: 100%;
        height: 64px;
    }

    .max {
        background: rgba(128, 128, 128, 0.342);
    }
</style>

<script lang="ts">
    export let type: 'solid' | 'bordered' = 'solid';
    export let color: 'accent' | 'light' | 'dark' | 'gray' = 'accent';
    export let classes = "";
    export let buttonType: 'submit' | 'button' | 'reset' = 'button';
    export let onClick = () => {};
</script>

<button class="btn btn-{type} btn-{color} {classes}" type="{buttonType}" on:click={onClick}>
    <slot></slot>
</button>

<style lang="css">
    .btn {
        appearance: none;
        border-radius: 5px;
        padding: 10px 12px;
        font-weight: 600;
        font-stretch: normal;
        line-height: 2.22;
        letter-spacing: normal;
        min-width: 200px;
        font-size: 14px;
        transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    .btn.btn-solid.btn-accent {
        background-color: #7856ff;
        border: 2px solid #7856ff;
        color: #fffffd;
    }
    .btn.btn-solid.btn-accent:hover {
        background-color: #412C90;
        border-color: #412C90;
    }


    .btn.btn-solid.btn-light {
        background-color: #fffffd;
        border: 2px solid #fffffd;
        color: #7856ff;
    }
    .btn.btn-solid.btn-light:hover {
        background-color: #fffffd;
        border-color: #fffffd;
    }

    .btn.btn-bordered.btn-accent {
        border: 2px solid #7856ff;
        color: #7856ff;
    }
    .btn.btn-bordered.btn-accent:hover {
        background-color: #7856ff;
        color: #fffffd;
    }

    .btn.btn-bordered.btn-light {
        border: 2px solid #fffffd;
    }
    .btn.btn-bordered.btn-light:hover {
        background-color: #fffffd;
        color: #7856ff;
    }

    .btn.btn-bordered.btn-gray {
        border: 2px solid #e0e0e0;
    }
    .btn.btn-bordered.btn-gray:hover {
        background-color: #e0e0e0;
        color: #7856ff;
    }
</style>
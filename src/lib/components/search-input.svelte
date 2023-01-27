<script lang="ts">
    import SearchIcon from "$lib/assets/images/search.svg?component";
</script>


<div class="search-input w-full">
    <input class="control w-full border border-accent rounded text-light" type="search">
    <div class="icon">
        <SearchIcon fill="#7856ff"></SearchIcon>
    </div>
</div>

<style>
    .search-input {
        position: relative;
    }
    .search-input .icon {
        position: absolute;
        right: 12px;
        top: 0;
        bottom: 0;
        margin: auto;
        height: 24px;
    }
    .search-input .control {
        background-color: transparent;
    }
    .search-input .control:focus {
        --tw-ring-color: #7856ff;
        border-color: #7856ff;
    }
</style>
<script>
    import Button from "$lib/components/button.svelte";
    import DeFactoLogo from '$lib/assets/images/1.svg?component';
    import ElToqueLogo from '$lib/assets/images/2.svg?component';
    import CollectivoLogo from '$lib/assets/images/colectivo+voces.svg?component';
    import FacebookIcon from '$lib/assets/images/facebook.svg?component';
    import TwitterIcon from '$lib/assets/images/twitter.svg?component';
    import InstagramIcon from '$lib/assets/images/instagram.svg?component';
</script>

<footer class="footer bg-accent">
    <div class="max-w-4xl pt-10 md:py-20 mx-auto">
        <div class="flex flex-col md:flex-row items-center">
            <ElToqueLogo class="logo mb-4 md:mb-0" width="120"></ElToqueLogo>
            <span class="dot mx-5 my-4"></span>
            <DeFactoLogo class="logo" width="120"></DeFactoLogo>
            <span class="dot mx-5 my-4"></span>
            <CollectivoLogo class="logo mt-4 md:mt-0" width="120" height="50"></CollectivoLogo>

            <div class="hidden ml-auto md:flex">
                <span class="social-icon">
                    <FacebookIcon fill="#e0e0e0" width="32" height="32"></FacebookIcon>
                </span>
                <span class="social-icon mx-5">
                    <TwitterIcon fill="#e0e0e0" width="32" height="32"></TwitterIcon>
                </span>
                <span class="social-icon">
                    <InstagramIcon fill="#e0e0e0" width="32" height="32"></InstagramIcon>
                </span>
            </div>
        </div>
        <div class="flex flex-col md:flex-row items-center md:items-start mt-14">
            <div class="flex flex-col flex-1 items-center md:items-start mb-10 md:mb-0">
                <span class="text-gray leading-loose">Coordinación editorial: Jessica Dominguez Delgado</span>
                <span class="text-gray leading-loose">Compilación y análisis de datos: Equipo DeFacto</span>
                <span class="text-gray leading-loose">Coordinación de Marketing: Roberto Pablo</span>
                <span class="text-gray leading-loose">Diseño: Janet Aguilar (Catao Studio)</span>
                <span class="text-gray leading-loose">Programación: Datalis</span>
                <Button type='bordered' color="gray" classes="text-gray mt-10">Descarga la base de datos</Button>
            </div>
            <nav class="flex flex-col items-center md:items-end bg-dark md:bg-accent w-full md:w-auto md:py-0 py-5">
                <a href="/" class="text-light leading-loose">Inicio</a>
                <a href="/fallecidos" class="text-light leading-loose">Listado de Fallecidos</a>
                <a href="/desaparecidos" class="text-light leading-loose">Listado de Desparecidos</a>
                <div class="md:hidden md:ml-auto flex mt-10">
                    <a href="/" class="social-icon">
                        <FacebookIcon fill="#e0e0e0" width="32" height="32"></FacebookIcon>
                    </a>
                    <a href="/" class="social-icon mx-5">
                        <TwitterIcon fill="#e0e0e0" width="32" height="32"></TwitterIcon>
                    </a>
                    <a href="/" class="social-icon">
                        <InstagramIcon fill="#e0e0e0" width="32" height="32"></InstagramIcon>
                    </a>
                </div>
            </nav>
        </div>
    </div>
</footer>
<style>
     .footer .dot {
        width: 8px;
        height: 8px;
        background-color: #e0e0e0;
        border-radius: 50%;
    }
    .footer .social-icon {
        border: 1px solid #e0e0e0;
        border-radius: 50%;
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    :global(.footer .logo path) {
        fill: #e0e0e0;
    }
</style>
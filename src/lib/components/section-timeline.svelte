<script>
    import TimeLine from './timeline.svelte';
</script>

<section id="section-timeline" class="section-timeline bg-dark md:pb-20">
	<div class="flex flex-col justify-center items-center">
		<div class="max-w-3xl md:mb-10 px-10">
			<h2 class="font-sans font-extrabold text-5xl md:text-5xl text-light mb-7">
				El final
				<span class="text-accent">"infeliz"</span>
				<br />
				del camino
			</h2>
			<p class="text-light">
				Hasta el momento hemos identificado más de 580 incidentes que han ocurrido desde enero de
				2021 que involucran a migrantes cubanos en diferentes zonas geográficas. Las historias no
				solo reflejan la tragedia que significa que alguien muera o desaparezca, también han sido
				rescatados o interceptados en el mar, detenidos por las autoridades de los países donde se
				encuentra, devueltos o repatriados.
			</p>
		</div>
	</div>
	<div class="mx-10 flex min-h-screen py-10">
		<div class="w-1/3 bg-accent rounded-xl flex flex-col justify-center text-light">
            <p class="px-10 text-justify">
                Te mostramos la distribucion del presupuesto regional
                durante los años 2010 al 2021. Puedes observar tanto
                el gasto presupuestado total, como el presupuesto por
                habitante. También puedes ver las cantidades por area
                funcional, como por ejemplo Sanidad, referidas a cada
                region o a todo el territorio nacional. Ten en cuenta que
                nlgunas comunidades autonomas tienen competencias
                que otras no tienen -pasa, por ejemplo, en Justicia,
                que en ocasiones estă transferida y en otras no-, por lo
                que el gasto total no es comparable sin tener en
                cuenta esas diferencias.
            </p>
        </div>
		<div class="w-2/3 ml-2">
            <TimeLine />
        </div>
	</div>
</section>

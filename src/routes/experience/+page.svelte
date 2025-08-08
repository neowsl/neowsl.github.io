<script>
    import NewsCard from "./NewsCard.svelte";
</script>

<div class="mt-12 flex p-4 sm:p-8 md:justify-center">
    <article class="lg-prose-xl prose max-w-none md:max-w-2/3">
        <h1>News</h1>
        <div class="not-prose flex flex-col gap-4">
            <NewsCard
                image="https://wpcdn.web.wsu.edu/news/uploads/sites/2797/2025/02/hackathon-1024x676.jpg"
                imageAlt="Student participants in the AgAID Digital AgAthon"
                title="AgAID Hackathon aims to use AI to benefit the agriculture industry"
                description="Won first place in AgAID / Washington State University's PhD-level AI hackathon (70 participants). Led a team of 6 to develop an agricultural weather forecast tool. Trained machine learning model on decades of spatiotemporal meteorological data; 70 million data points, 15 variables. Created a 96% accurate model using Scikit-learn's Random Forest Regressors and cKDTrees. Presented key findings with data visualisations."
                date="2025-02-25"
                repo="https://github.com/neowsl/agath0n"
                link="https://news.wsu.edu/news/2025/02/25/agaid-hackathon-aims-to-use-ai-to-benefit-the-agriculture-industry"
            />
            <NewsCard
                image="https://i.ytimg.com/vi/B1UjuttHhng/maxresdefault.jpg"
                imageAlt="Amethyst winning photo"
                title="Gerrywandering wins Rep. Cathy McMorris Rodgers’ 2024 Congressional App Challenge in Washington’s Fifth District"
                description="Won first place in prestigious nationwide coding competition hosted by the U.S. Congress (~9,000 participants). Modelled voter patterns and gerrymandering in political environments using flocking algorithms. Recognized by Washington representative for software innovation."
                date="2025-01-16"
                repo="https://github.com/neowsl/gerrywandering"
                link="https://www.congressionalappchallenge.us/24-WA05/"
            />
            <NewsCard
                image="https://www.dropbox.com/scl/fi/zc0rs6pe9wbyd07g6zihv/amethyst.jpeg?rlkey=pnurk8btslq5byeweq8evcylp&st=9tx537p0&raw=1"
                imageAlt="Amethyst winning photo"
                title="Amethyst wins Major League Hacking's 2024 CrimsonCode Hackathon"
                description="Won first place in Major League Hacking / Washington State University's yearly collegiate hackathon (168 teams). Led a team of 4 to create a dating app for computer science students. Engineered full-stack app using SvelteKit, Tailwind CSS, tRPC, and PostgreSQL. Rolled own authentication. Learned about designing social media algorithms."
                date="2024-02-20"
                repo="https://github.com/neowsl/amethyst"
                link="https://www.instagram.com/p/C3mOH2tuEcu/?img_index=3"
            />
            <NewsCard
                image="https://i.ytimg.com/vi/EMvJ1ETNDnE/maxresdefault.jpg"
                imageAlt="PashHash YouTube video thumbnail"
                title="PashHash wins Rep. Cathy McMorris Rodgers’ 2022 Congressional App Challenge in Washington’s Fifth District"
                description="Won first place in prestigious nationwide coding competition hosted by the U.S. Congress (~9,000 participants). Developed innovative offline password management syste to enhance digital security. Recognized by Washington representative for software innovation."
                date="2023-02-01"
                repo="https://github.com/neowsl/hashword"
                link="https://www.congressionalappchallenge.us/22-WA05/"
            />
        </div>
    </article>
</div>

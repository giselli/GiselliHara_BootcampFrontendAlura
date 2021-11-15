import React from 'react';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';
import FAQQuestionScreen from '../../src/components/screens/FAQQuestionScreen';

function FAQInternaScreen({ category, question }) {
  return (
    <FAQQuestionScreen
      question={question}
      category={category}
    />
  );
}

FAQInternaScreen.propTypes = FAQQuestionScreen.propTypes;

export default websitePageHOC(FAQInternaScreen);

export async function getStaticProps({ params }) {
  const faqCategories = await fetch('http://instalura-api.vercel.app/api/content/faq')
    .then(async (respostaDoServer) => {
      const resposta = await respostaDoServer.json();
      return resposta.data;
    });

  const dadosDaPage = faqCategories.reduce((valorAcumulado, faqCategory) => {
    const foundQuestion = faqCategory.questions.find((question) => {
      if (question.slug === params.id) {
        return true;
      }
      return false;
    });
    return {
      ...valorAcumulado,
      category: faqCategory,
      question: foundQuestion,
    };
  }, {});

  return {
    props: {
      category: dadosDaPage.category,
      question: dadosDaPage.question,

      pageWrapperProps: {
        seoProps: {
          headTitle: dadosDaPage.question.title,
        },
      },
    },
  };
}

export async function getStaticPaths() {
  const faqCategories = await fetch('http://instalura-api.vercel.app/api/content/faq')
    .then(async (respostaDoServer) => {
      const resposta = await respostaDoServer.json();
      return resposta;
    });

  const paths = faqCategories.data.reduce((valorAcumulado, faqCategory) => {
    const questionsPath = faqCategory.questions.map((question) => {
      const questionSlug = question.slug;
      return { params: { id: questionSlug } };
    });

    return [
      ...valorAcumulado,
      ...questionsPath,
    ];
  }, []);

  return {
    paths,
    fallback: false,
  };
}

import { useEffect, useState, useMemo } from "react";
import { useAmbientTRenderEngine } from "react-native-render-html";
import { findAll } from 'domutils';
import { Element } from 'domhandler';

function useFetchHtml(url: string) {
    const [fetchState, setState] = useState({
        html: null as string | null,
        error: null as string | null
    });

    useEffect(
        function fetchArticle() {
            let cancelled = false;
            (async function () {
                const response = await fetch(url);
                if (response.ok) {
                    const html = await response.text();

                    if (!cancelled) {
                        setState({ html, error: null });
                    }
                } else {
                    if (!cancelled) {
                        setState({
                            html: null,
                            error: `Could not load HTML. Received status ${response.status}`
                        });
                    }
                }
            })();
        },
        [url]
    )

    return fetchState;
}

export default function useArticleDom(url: string) {

    const engine = useAmbientTRenderEngine();
    const [headings, setHeadings] = useState<Element[]>([]);
    const { html } = useFetchHtml(url);
    const dom = useMemo(() => {
        if (typeof html === 'string') {
            const parsed = engine.parseDocument(html);
            return parsed;
        }
        return null;
    }, [html, engine]);

    useEffect(() => {
        if (!dom) {
            return;
        }

        const article = (dom.children[0] as Element)?.children[0] as Element;
        const headers = findAll(
            (elm) => elm.tagName == 'h2' || elm.tagName === 'h3',
            article.children
        );

        setHeadings(headers);
    }, [dom])

    // console.log(dom?.children, headings);

    return { dom, headings };
}

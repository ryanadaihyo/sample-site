import React from "react";

type JsonLdData = Record<string, unknown>;

interface JsonLdProps {
    data: JsonLdData;
}

const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
};

export default JsonLd;

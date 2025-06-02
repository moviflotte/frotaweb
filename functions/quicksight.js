import { AwsClient } from 'aws4fetch';

const region = 'us-east-1';
const ACCOUNT_ID = '137295066015';
const DASHBOARD_ID = 'ef6b033c-8783-4ad0-b0bd-12ce4834b334';

export const onRequest = async ({env}) => {
    const aws = new AwsClient({
        accessKeyId: env?.AWS_ACCESS_KEY_ID,
        secretAccessKey: env?.AWS_SECRET_ACCESS_KEY,
        service: 'quicksight',
        region
    });
    const body = new URLSearchParams({
        'creds-type': 'QUICKSIGHT',
        'user-arn': `arn:aws:quicksight:${region}:${ACCOUNT_ID}:user/default/${ACCOUNT_ID}`
    });
    const url = `https://quicksight.${region}.amazonaws.com/accounts/${ACCOUNT_ID}/dashboards/${DASHBOARD_ID}/embed-url?${body}`
    const response = await aws.fetch(url)

    const {EmbedUrl} = await response.json();

    return new Response(EmbedUrl);
}

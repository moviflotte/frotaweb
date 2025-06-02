import { AwsClient } from 'aws4fetch';

const REGION = 'us-east-1';
const ACCOUNT_ID = '123456789012';
const DASHBOARD_ID = 'dashboard-id';

export const onRequest = async ({env}) => {
    const aws = new AwsClient({
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        service: 'quicksight',
        region: REGION
    });
    const body = JSON.stringify({
        AwsAccountId: ACCOUNT_ID,
        SessionLifetimeInMinutes: 60,
        Namespace: 'default',
        AuthorizedResourceArns: [
            `arn:aws:quicksight:${REGION}:${ACCOUNT_ID}:dashboard/${DASHBOARD_ID}`
        ],
        ExperienceConfiguration: {
            Dashboard: {
                InitialDashboardId: DASHBOARD_ID
            }
        }
    });

    const response = await aws.fetch(
        `https://quicksight.${REGION}.amazonaws.com/accounts/${ACCOUNT_ID}/embed-url/anonymous`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Amz-Target': 'QuickSight.GenerateEmbedUrlForAnonymousUser'
            },
            body
        }
    );

    return new Response(await response.text(), {
        headers: { 'Content-Type': 'application/json' }
    });
}

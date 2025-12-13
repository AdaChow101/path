import { UserAnswers, CareerReport } from "../types";

// TODO: 请将此域名替换为您部署后端 API 后的实际阿里云域名
// 部署到阿里云函数计算 (FC) 后，这个地址可能是：https://<service-name>.<region>.fc.aliyuncs.com
// 如果您将前端和后端部署在一起，可以直接使用相对路径 '/api/proxy'
const ALICLOUD_API_DOMAIN = 'http://proxy-api.pathfinderproxyservice.1441245188179359.cn-shanghai.fc.devsapp.net'; 
const endpoint = `${ALICLOUD_API_DOMAIN}/api/proxy`;
  

export const generateCareerAnalysis = async (answers: UserAnswers): Promise<CareerReport> => {

  // 注意：此处需要将答案放在一个 'answers' 键下，与修改后的 Python 后端 RequestData 匹配。
  // 同时，我们将从 .env.local 中移除的 API key 字段也移除了。
  const requestBody = {
    answers: answers,
    // 如果您需要临时覆盖环境密钥，可以在此添加 apiKey 字段:
    // apiKey: process.env.TONGYI_QIANWEN_API_KEY, 
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody), // 注意这里传递的是 requestBody
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      // 这里的错误信息需要适配后端修改后的 HTTPException 详情
      throw new Error(errorData.detail || `Server responded with ${response.status}`);
    }

    const data = await response.json();
    return data as CareerReport; // 现在后端直接返回 CareerReport 结构
    
  } catch (error: any) {
    console.error("Analysis Failed:", error);
    throw new Error(error.message || "无法连接到阿里云分析服务，请稍后重试。");
  }
};
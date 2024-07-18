async function fetchMetadata(transactionId, isTestnet = false) {
  const baseUrl = isTestnet ? 'https://blockstream.info/testnet/api' : 'https://blockstream.info/api';
  try {
    const response = await axios.get(${baseUrl}/tx/${transactionId});
    const transaction = response.data;
    // Extract metadata from the transaction output scripts
    transaction.vout.forEach(output => {
      if (output.scriptpubkey_type === 'op_return') {
        const metadata = Buffer.from(output.scriptpubkey.slice(4), 'hex').toString('utf8');
        console.log(metadata);
      }
    });
  } catch (error) {
    console.error('Error fetching transaction:', error);
  }
}

// Example usage for testnet
fetchMetadata('<transaction_id>', true); 
